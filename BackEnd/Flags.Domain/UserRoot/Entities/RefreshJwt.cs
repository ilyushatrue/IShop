using System.Security.Cryptography;
using Flags.Domain.Common.Models;
using Flags.Domain.UserEntity;

namespace Flags.Domain.UserRoot.Entities;

public class RefreshJwt : Entity<Guid>
{
	private RefreshJwt() { }
	private RefreshJwt(Guid userId) : base(userId)
	{
		Update();
	}

	public static RefreshJwt Create(Guid userId) => new(userId);

	public DateTime ExpiryDatetime { get; private set; }
	public string Value { get; private set; } = null!;

	public User User { get; } = null!;

	public void Update()
	{
		Value = GenerateToken();
		ExpiryDatetime = DateTime.Now.AddMinutes(5);
	}

	private string GenerateToken()
	{
		var randomNumber = new byte[32];
		using var rng = RandomNumberGenerator.Create();
		rng.GetBytes(randomNumber);
		return Convert.ToBase64String(randomNumber);
	}
}