namespace Flags.Domain.UserRoot.Entities;

public class UserRole
{
    private UserRole() { }
    private UserRole(Guid userId, int roleId)
    {
        UserId = userId;
        RoleId = roleId;
    }
    public static UserRole Create(Guid userId, int roleId)
    {
        return new UserRole(userId, roleId);
    }

    public Guid UserId { get; private set; }
    public int RoleId { get; private set; }

    public User User { get; private set; } = null!;
    public Role Role { get; private set; } = null!;
}