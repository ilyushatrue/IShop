﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Flags.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Flags.Infrastructure.Migrations
{
    [DbContext(typeof(FlagDbContext))]
    partial class FlagDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.4");

            modelBuilder.Entity("Flags.Domain.MediaEntity.Media", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("TEXT")
                        .HasColumnName("id");

                    b.Property<string>("Extension")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("extension");

                    b.Property<int>("FileSize")
                        .HasColumnType("INTEGER")
                        .HasColumnName("file_size");

                    b.Property<string>("Uri")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("uri");

                    b.HasKey("Id")
                        .HasName("pk_media");

                    b.ToTable("media", (string)null);
                });

            modelBuilder.Entity("Flags.Domain.UserEntity.User", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("TEXT")
                        .HasColumnName("id");

                    b.Property<Guid?>("AvatarId")
                        .HasColumnType("TEXT")
                        .HasColumnName("avatar_id");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("last_name");

                    b.ComplexProperty<Dictionary<string, object>>("Email", "Flags.Domain.UserEntity.User.Email#Email", b1 =>
                        {
                            b1.IsRequired();

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("TEXT")
                                .HasColumnName("email");
                        });

                    b.ComplexProperty<Dictionary<string, object>>("Password", "Flags.Domain.UserEntity.User.Password#Password", b1 =>
                        {
                            b1.IsRequired();

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("TEXT")
                                .HasColumnName("password");
                        });

                    b.ComplexProperty<Dictionary<string, object>>("Phone", "Flags.Domain.UserEntity.User.Phone#Phone", b1 =>
                        {
                            b1.IsRequired();

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("TEXT")
                                .HasColumnName("phone");
                        });

                    b.HasKey("Id")
                        .HasName("pk_users");

                    b.HasIndex("AvatarId")
                        .IsUnique()
                        .HasDatabaseName("ix_users_avatar_id");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.Permission", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("INTEGER")
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_permissions");

                    b.ToTable("permissions", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Read"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Create"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Update"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Delete"
                        });
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.RefreshJwt", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("TEXT")
                        .HasColumnName("user_id");

                    b.Property<DateTime>("ExpiryDatetime")
                        .HasColumnType("TEXT")
                        .HasColumnName("expiry_datetime");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("value");

                    b.HasKey("Id")
                        .HasName("pk_refresh_jwts");

                    b.ToTable("refresh_jwts", (string)null);
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("INTEGER")
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_roles");

                    b.ToTable("roles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Admin"
                        },
                        new
                        {
                            Id = 2,
                            Name = "User"
                        });
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.RolePermission", b =>
                {
                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("role_id");

                    b.Property<int>("PermissionId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("permission_id");

                    b.HasKey("RoleId", "PermissionId")
                        .HasName("pk_role_permissions");

                    b.HasIndex("PermissionId")
                        .HasDatabaseName("ix_role_permissions_permission_id");

                    b.ToTable("role_permissions", (string)null);
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.UserRole", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT")
                        .HasColumnName("user_id");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("role_id");

                    b.HasKey("UserId", "RoleId")
                        .HasName("pk_user_roles");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_user_roles_role_id");

                    b.ToTable("user_roles", (string)null);
                });

            modelBuilder.Entity("Flags.Domain.UserEntity.User", b =>
                {
                    b.HasOne("Flags.Domain.MediaEntity.Media", "Avatar")
                        .WithOne("User")
                        .HasForeignKey("Flags.Domain.UserEntity.User", "AvatarId")
                        .HasConstraintName("fk_users_media_avatar_id");

                    b.Navigation("Avatar");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.RefreshJwt", b =>
                {
                    b.HasOne("Flags.Domain.UserEntity.User", "User")
                        .WithOne("RefreshJwt")
                        .HasForeignKey("Flags.Domain.UserRoot.Entities.RefreshJwt", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_refresh_jwts_users_user_id");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.RolePermission", b =>
                {
                    b.HasOne("Flags.Domain.UserRoot.Entities.Permission", null)
                        .WithMany()
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_role_permissions_permissions_permission_id");

                    b.HasOne("Flags.Domain.UserRoot.Entities.Role", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_role_permissions_roles_role_id");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.UserRole", b =>
                {
                    b.HasOne("Flags.Domain.UserRoot.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_user_roles_roles_role_id");

                    b.HasOne("Flags.Domain.UserEntity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_user_roles_users_user_id");

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Flags.Domain.MediaEntity.Media", b =>
                {
                    b.Navigation("User");
                });

            modelBuilder.Entity("Flags.Domain.UserEntity.User", b =>
                {
                    b.Navigation("RefreshJwt");
                });
#pragma warning restore 612, 618
        }
    }
}
