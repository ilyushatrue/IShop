using Flags.Domain.Common.Models;
using Flags.Domain.UserEntity;

namespace Flags.Domain.UserRoot.Entities;

public class UserRefreshJwt : Entity<Guid>
{
	private UserRefreshJwt() { }
	private UserRefreshJwt(string token, DateTime expiryDatetime)
	{
		Token = token;
		ExpiryDatetime = expiryDatetime;
	}

	public static UserRefreshJwt Create(string token, DateTime expiryDatetime) =>
		new(token, expiryDatetime);

	public DateTime ExpiryDatetime { get; set; }
	public string Token { get; set; } = null!;

	public User User { get; } = null!;
}