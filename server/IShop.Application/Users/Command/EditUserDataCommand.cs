using IShop.Domain.Enums;

namespace IShop.Application.Users.Command;

public record EditUserDataCommand(
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    RoleEnum Role,
    Guid? AvatarId);