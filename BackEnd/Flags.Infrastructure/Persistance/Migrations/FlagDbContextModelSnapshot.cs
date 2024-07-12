﻿// <auto-generated />
using System;
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

            modelBuilder.Entity("Flags.Domain.MenuItemEntity.MenuItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT")
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("name");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER")
                        .HasColumnName("order");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("title");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("url");

                    b.HasKey("Id")
                        .HasName("pk_menu_items");

                    b.ToTable("menu_items", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("af016874-f93a-4ce5-8720-c4a17ab0fe1f"),
                            Name = "account",
                            Order = 1,
                            Title = "Мой профиль",
                            Url = "/account"
                        },
                        new
                        {
                            Id = new Guid("6e510858-a487-4748-a51c-9eeaae564610"),
                            Name = "purchases",
                            Order = 2,
                            Title = "Покупки",
                            Url = "/purchases"
                        },
                        new
                        {
                            Id = new Guid("88c2abeb-9dc0-41f9-9220-32e7e7255533"),
                            Name = "cart",
                            Order = 3,
                            Title = "Корзина",
                            Url = "/cart"
                        },
                        new
                        {
                            Id = new Guid("96349595-7f01-4a93-8a23-a3cc58a09b79"),
                            Name = "products",
                            Order = 4,
                            Title = "Товары",
                            Url = "/products"
                        },
                        new
                        {
                            Id = new Guid("5cb5a119-2f15-4552-bef2-f4730f800530"),
                            Name = "users",
                            Order = 5,
                            Title = "Пользователи",
                            Url = "/users"
                        },
                        new
                        {
                            Id = new Guid("328332a3-9355-4968-bc12-de34950dd631"),
                            Name = "settings",
                            Order = 6,
                            Title = "Настройки",
                            Url = "/settings"
                        });
                });

            modelBuilder.Entity("Flags.Domain.ProductRoot.Entities.ProductCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER")
                        .HasColumnName("id");

                    b.Property<string>("IconName")
                        .HasColumnType("TEXT")
                        .HasColumnName("icon_name");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("name");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER")
                        .HasColumnName("order");

                    b.HasKey("Id")
                        .HasName("pk_product_categories");

                    b.ToTable("product_categories", (string)null);
                });

            modelBuilder.Entity("Flags.Domain.ProductRoot.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("TEXT")
                        .HasColumnName("id");

                    b.Property<int>("CategoryId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("category_id");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT")
                        .HasColumnName("description");

                    b.Property<Guid>("ImageId")
                        .HasColumnType("TEXT")
                        .HasColumnName("image_id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("name");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT")
                        .HasColumnName("price");

                    b.HasKey("Id")
                        .HasName("pk_products");

                    b.HasIndex("CategoryId")
                        .HasDatabaseName("ix_products_category_id");

                    b.HasIndex("ImageId")
                        .HasDatabaseName("ix_products_image_id");

                    b.ToTable("products", (string)null);
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
                            Id = 4,
                            Name = "Update"
                        },
                        new
                        {
                            Id = 8,
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
                        },
                        new
                        {
                            Id = 4,
                            Name = "Seller"
                        });
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.RoleMenuItem", b =>
                {
                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("role_id");

                    b.Property<Guid>("MenuItemId")
                        .HasColumnType("TEXT")
                        .HasColumnName("menu_item_id");

                    b.HasKey("RoleId", "MenuItemId")
                        .HasName("pk_role_menu_items");

                    b.HasIndex("MenuItemId")
                        .HasDatabaseName("ix_role_menu_items_menu_item_id");

                    b.ToTable("role_menu_items", (string)null);
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

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.UserEmailConfirmation", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("TEXT")
                        .HasColumnName("id");

                    b.Property<Guid>("ConfirmationToken")
                        .HasColumnType("TEXT")
                        .HasColumnName("confirmation_token");

                    b.Property<DateTime>("ExpiryDateTime")
                        .HasColumnType("TEXT")
                        .HasColumnName("expiry_date_time");

                    b.Property<bool>("IsConfirmed")
                        .HasColumnType("INTEGER")
                        .HasColumnName("is_confirmed");

                    b.HasKey("Id")
                        .HasName("pk_user_email_confirmations");

                    b.ToTable("user_email_confirmations", (string)null);
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.UserFavoriteProduct", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT")
                        .HasColumnName("user_id");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("TEXT")
                        .HasColumnName("product_id");

                    b.HasKey("UserId", "ProductId")
                        .HasName("pk_user_favorite_products");

                    b.HasIndex("ProductId")
                        .HasDatabaseName("ix_user_favorite_products_product_id");

                    b.ToTable("user_favorite_products", (string)null);
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.User", b =>
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

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER")
                        .HasColumnName("role_id");

                    b.HasKey("Id")
                        .HasName("pk_users");

                    b.HasIndex("AvatarId")
                        .IsUnique()
                        .HasDatabaseName("ix_users_avatar_id");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_users_role_id");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("Flags.Domain.ProductRoot.Product", b =>
                {
                    b.HasOne("Flags.Domain.ProductRoot.Entities.ProductCategory", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_products_product_categories_category_id");

                    b.HasOne("Flags.Domain.MediaEntity.Media", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_products_media_image_id");

                    b.Navigation("Category");

                    b.Navigation("Image");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.RefreshJwt", b =>
                {
                    b.HasOne("Flags.Domain.UserRoot.User", "User")
                        .WithOne("RefreshJwt")
                        .HasForeignKey("Flags.Domain.UserRoot.Entities.RefreshJwt", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_refresh_jwts_users_user_id");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.RoleMenuItem", b =>
                {
                    b.HasOne("Flags.Domain.MenuItemEntity.MenuItem", "MenuItem")
                        .WithMany("RoleMenuItems")
                        .HasForeignKey("MenuItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_role_menu_items_menu_items_menu_item_id");

                    b.HasOne("Flags.Domain.UserRoot.Entities.Role", "Role")
                        .WithMany("RoleMenuItems")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_role_menu_items_roles_role_id");

                    b.Navigation("MenuItem");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.RolePermission", b =>
                {
                    b.HasOne("Flags.Domain.UserRoot.Entities.Permission", "Permission")
                        .WithMany("RolePermissions")
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_role_permissions_permissions_permission_id");

                    b.HasOne("Flags.Domain.UserRoot.Entities.Role", "Role")
                        .WithMany("RolePermissions")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_role_permissions_roles_role_id");

                    b.Navigation("Permission");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.UserEmailConfirmation", b =>
                {
                    b.HasOne("Flags.Domain.UserRoot.User", "User")
                        .WithOne("EmailConfirmation")
                        .HasForeignKey("Flags.Domain.UserRoot.Entities.UserEmailConfirmation", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_user_email_confirmations_users_id");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.UserFavoriteProduct", b =>
                {
                    b.HasOne("Flags.Domain.ProductRoot.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_user_favorite_products_products_product_id");

                    b.HasOne("Flags.Domain.UserRoot.User", "User")
                        .WithMany("FavoriteProducts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_user_favorite_products_users_user_id");

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.User", b =>
                {
                    b.HasOne("Flags.Domain.MediaEntity.Media", "Avatar")
                        .WithOne("User")
                        .HasForeignKey("Flags.Domain.UserRoot.User", "AvatarId")
                        .HasConstraintName("fk_users_media_avatar_id");

                    b.HasOne("Flags.Domain.UserRoot.Entities.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_users_roles_role_id");

                    b.OwnsOne("Flags.Domain.UserRoot.ValueObjects.Email", "Email", b1 =>
                        {
                            b1.Property<Guid>("UserId")
                                .HasColumnType("TEXT")
                                .HasColumnName("id");

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("TEXT")
                                .HasColumnName("email");

                            b1.HasKey("UserId");

                            b1.HasIndex("Value")
                                .IsUnique()
                                .HasDatabaseName("ix_user_email");

                            b1.ToTable("users");

                            b1.WithOwner()
                                .HasForeignKey("UserId")
                                .HasConstraintName("fk_users_users_id");
                        });

                    b.OwnsOne("Flags.Domain.UserRoot.ValueObjects.Password", "Password", b1 =>
                        {
                            b1.Property<Guid>("UserId")
                                .HasColumnType("TEXT")
                                .HasColumnName("id");

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("TEXT")
                                .HasColumnName("password");

                            b1.HasKey("UserId");

                            b1.ToTable("users");

                            b1.WithOwner()
                                .HasForeignKey("UserId")
                                .HasConstraintName("fk_users_users_id");
                        });

                    b.OwnsOne("Flags.Domain.UserRoot.ValueObjects.Phone", "Phone", b1 =>
                        {
                            b1.Property<Guid>("UserId")
                                .HasColumnType("TEXT")
                                .HasColumnName("id");

                            b1.Property<string>("Value")
                                .IsRequired()
                                .HasColumnType("TEXT")
                                .HasColumnName("phone");

                            b1.HasKey("UserId");

                            b1.HasIndex("Value")
                                .IsUnique()
                                .HasDatabaseName("ix_user_phone")
                                .HasFilter("[phone] IS NOT NULL");

                            b1.ToTable("users");

                            b1.WithOwner()
                                .HasForeignKey("UserId")
                                .HasConstraintName("fk_users_users_id");
                        });

                    b.Navigation("Avatar");

                    b.Navigation("Email")
                        .IsRequired();

                    b.Navigation("Password")
                        .IsRequired();

                    b.Navigation("Phone");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Flags.Domain.MediaEntity.Media", b =>
                {
                    b.Navigation("User");
                });

            modelBuilder.Entity("Flags.Domain.MenuItemEntity.MenuItem", b =>
                {
                    b.Navigation("RoleMenuItems");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.Permission", b =>
                {
                    b.Navigation("RolePermissions");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.Entities.Role", b =>
                {
                    b.Navigation("RoleMenuItems");

                    b.Navigation("RolePermissions");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("Flags.Domain.UserRoot.User", b =>
                {
                    b.Navigation("EmailConfirmation");

                    b.Navigation("FavoriteProducts");

                    b.Navigation("RefreshJwt");
                });
#pragma warning restore 612, 618
        }
    }
}
