using Flags.Domain.Enums;

namespace Flags.Application.Users.Command;

public record EditUserDataCommand(
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    RoleFlag Role,
    Guid? AvatarId);