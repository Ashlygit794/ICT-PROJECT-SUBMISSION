﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using foodRecipe;

#nullable disable

namespace tourPackage.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241214103858_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("foodRecipe.Comments", b =>
                {
                    b.Property<int>("commentid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("commentid"));

                    b.Property<string>("comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("packageid")
                        .HasColumnType("int");

                    b.Property<int>("userid")
                        .HasColumnType("int");

                    b.HasKey("commentid");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("foodRecipe.Package", b =>
                {
                    b.Property<int>("packageid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("packageid"));

                    b.Property<string>("details")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("imagebase64")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("price")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("userid")
                        .HasColumnType("int");

                    b.HasKey("packageid");

                    b.ToTable("Packages");
                });

            modelBuilder.Entity("foodRecipe.TourUser", b =>
                {
                    b.Property<int>("userid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("userid"));

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("usertype")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("userid");

                    b.ToTable("TourUsers");
                });
#pragma warning restore 612, 618
        }
    }
}
