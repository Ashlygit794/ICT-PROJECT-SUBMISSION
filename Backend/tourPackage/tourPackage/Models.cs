using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace foodRecipe
{
    public class TourUser
    {
        [JsonIgnore]
        [Key]
        public int userid { get; set; }
        public string usertype { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }


    public class LoginRequest
    {
        public string usertype { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }

    public class Package
    {
        [Key]
        public int packageid { get; set; }
        public int userid { get; set; }
        public string name { get; set; }
        public string price { get; set; }

        public string details { get; set; }
        public string imagebase64 { get; set; } // Store the image as a base64 string
    }

    public class PackageCreateRequest
    {
        public int userid { get; set; }
        public string name { get; set; }
        public string price { get; set; }

        public string details { get; set; }
        public string imagebase64 { get; set; } // Base64 encoded image string }


    }

    public class Comments
    {
        [JsonIgnore]
        [Key]
        public int commentid { get; set; } // Primary key, auto-increment
        public int userid { get; set; }
        public int packageid { get; set; }
        public string comment { get; set; }
    }


    public class Booking
    {
        [JsonIgnore]
        [Key]
        public int bookingid { get; set; } // Primary key, auto-increment
        public int clientid { get; set; }
        public int packageid { get; set; }
    }




}