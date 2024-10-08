﻿using IShop.Domain.Enums;
using IShop.Domain.UserRoot;

namespace IShop.Application.Persistance.Repositories;
public interface IUserRepository
{
    Task<bool> CheckUserExistsByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<bool> CheckUserWithEmailExistsAsync(string email, CancellationToken cancellationToken);
    Task<bool> CheckUserWithPhoneExistsAsync(string phone, CancellationToken cancellationToken);
    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken);
    Task<User?> GetByPhoneAsync(string phone, CancellationToken cancellationToken);
    Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    void Create(User user);
    void Update(User user);
    Task<List<User>> GetAllAsync(CancellationToken cancellationToken);
    Task<HashSet<PermissionEnum>> GetPermissionsAsync(Guid userId);
}
