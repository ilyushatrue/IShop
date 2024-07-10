using System.Security.Cryptography;
using Flags.Domain.Common.Models;

namespace Flags.Domain.UserRoot.Entities;

public class RefreshJwt : Entity<Guid>
{
    private RefreshJwt() { }
    private RefreshJwt(Guid userId, int expiryDays) : base(userId)
    {
        Update(expiryDays);
    }

    public static RefreshJwt Create(Guid userId, int expiryDays) => new(userId, expiryDays);

    public DateTime ExpiryDatetime { get; private set; }
    public string Value { get; private set; } = null!;

    public User? User { get; private set; }

    public void Update(int expiryDays)
    {
        Value = GenerateToken();
        ExpiryDatetime = DateTime.Now.AddDays(expiryDays);
    }

    private static string GenerateToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
}