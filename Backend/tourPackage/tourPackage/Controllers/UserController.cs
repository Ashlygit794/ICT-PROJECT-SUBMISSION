using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace foodRecipe.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] TourUser user)
        {
            if (await _context.TourUsers.AnyAsync(u => u.email == user.email))
            {
                return BadRequest("User with this email already exists.");
            }

            _context.TourUsers.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { UserId = user.userid });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] TourUser loginRequest)
        {
            var user = await _context.TourUsers
                .FirstOrDefaultAsync(u => u.email == loginRequest.email && u.password == loginRequest.password && u.usertype==loginRequest.usertype);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { UserId = user.userid });
        }

        [HttpGet("users")] 
        public async Task<IActionResult> GetAllUsers() 
        {
            var users = await _context.TourUsers.ToListAsync(); 
            return Ok(users);
        }


        [HttpPost("addPackage")] public async Task<IActionResult> AddPackage([FromBody] PackageCreateRequest request)
        { 
            var userExists = await _context.TourUsers.AnyAsync(
                u => u.userid == request.userid); 
            if (!userExists) { 
                return BadRequest("User does not exist.");
            } 
            var recipe = new Package 
            { 
                userid = request.userid,
                name = request.name, 
                price = request.price,
                details=request.details,
                imagebase64 = request.imagebase64
            }; 
            _context.Packages.Add(recipe);
            await _context.SaveChangesAsync();
            return Ok(new { PackageId = recipe.packageid }); 
        }


        [HttpGet("packages/user/{userid}")]
        public async Task<IActionResult> GetPackagesByUserId(int userid)
        {
            var userExists = await _context.TourUsers.AnyAsync(u => u.userid == userid);
            if (!userExists)
            {
                return BadRequest("User does not exist.");
            }

            var packages = await _context.Packages.Where(r => r.userid == userid).ToListAsync();
            if (packages == null || packages.Count == 0)
            {
                return NotFound("No packages found for this user.");
            }

            return Ok(packages);
        }



        [HttpGet("packages/{id}")] 
        public async Task<IActionResult> GetPackagesById(int id) 
        {
            var package = await _context.Packages.FindAsync(id);
            if (package == null) 
            {
                return NotFound("packages not found.");
            }
            return Ok(package);
        }

        [HttpGet("packages")] public async Task<IActionResult> GetAllPackages()
        { 
            var packages = await _context.Packages.ToListAsync(); 
            return Ok(packages);
        }



        [HttpDelete("packages/{id}")] public async Task<IActionResult> DeletePackagesById(int id) 
        {
            var recipe = await _context.Packages.FindAsync(id); 
            if (recipe == null)
            { 
                return NotFound("package not found.");
            } 
            _context.Packages.Remove(recipe);
            await _context.SaveChangesAsync(); 
            return Ok("package deleted successfully."); 
        }

        [HttpPost("addReview")] public async Task<IActionResult> AddReview([FromBody] Comments review) 
        {
            var userExists = await _context.TourUsers.AnyAsync(u => u.userid == review.userid); 
            var packageExists = await _context.Packages.AnyAsync(r => r.packageid == review.packageid); 
            if (!userExists) 
            {
                return BadRequest("User does not exist.");
            } 
            if (!packageExists)
            { 
                return BadRequest("Package does not exist.");
            } 
            _context.Comments.Add(review);
            await _context.SaveChangesAsync(); 
            return Ok(new { CommentId = review.commentid });
        }


        [HttpGet("reviews/{packageId}")] public async Task<IActionResult> GetReviewsByRecipeId(int packageId)
        { 
            var review = await _context.Comments.Where(r => r.packageid == packageId).ToListAsync(); 
            if (!review.Any()) 
            { 
                return NotFound("No reviews found for this recipe.");
            } 
            return Ok(review);
        }


        [HttpPost("bookPackage")]
        public async Task<IActionResult> CreateBooking([FromBody] Booking booking)
        {

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return Ok(new { BookingId = booking.bookingid });
        }



        [HttpGet("packageDetailsByUser/{userid}")]
        public async Task<IActionResult> GetPackageDetailsByUserId(int userid)
        {
            // Check if the user exists
            var userExists = await _context.TourUsers.AnyAsync(u => u.userid == userid);
            if (!userExists)
            {
                return BadRequest("User does not exist.");
            }

            // Get the packages created by the user
            var packagesCreatedByUser = await _context.Packages
                .Where(p => p.userid == userid)
                .ToListAsync();

            if (packagesCreatedByUser == null || !packagesCreatedByUser.Any())
            {
                return NotFound("No packages found for this user.");
            }

            // Get the package IDs created by the user
            var packageIds = packagesCreatedByUser.Select(p => p.packageid).ToList();

            // Get the bookings for the packages created by the user
            var bookings = await _context.Bookings
                .Where(b => packageIds.Contains(b.packageid))
                .ToListAsync();

            if (bookings == null || !bookings.Any())
            {
                return NotFound("No bookings found for the packages created by this user.");
            }

            // Get the package details and client email
            var packageDetails = bookings.Select(b => new
            {
                b.packageid,
                p = packagesCreatedByUser.FirstOrDefault(p => p.packageid == b.packageid)?.name,
                ClientEmail = _context.TourUsers.FirstOrDefault(u => u.userid == b.clientid)?.email
            }).ToList();

            return Ok(packageDetails);
        }


    }

    

}
