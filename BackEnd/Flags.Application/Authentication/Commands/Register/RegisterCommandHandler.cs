using Flags.Domain.User.Entities;
using ErrorOr;
using Flags.Application.Common.Interfaces.Authentication;
using Flags.Application.Common.Interfaces.Persistance;
using MediatR;
using Flags.Application.Authentication.Common;
using Flags.Domain.User.ValueObjects;

namespace Flags.Application.Authentication.Commands.Register;

public class RegisterCommandHandler(
	IUserRepository userRepository,
	IJwtTokenGenerator jwtTokenGenerator,
	IPasswordHasher passwordHasher
) :
	IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
{
	public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand command, CancellationToken cancellationToken)
	{
		var errors = new List<Error>();
		var existingUsers = await userRepository.GetAllAsync();
		var existingEmails = existingUsers.Select(x => x.Email.Value).ToArray();
		var existingPhones = existingUsers.Select(x => x.Phone.Value).ToArray();


		var email = Email.Create(command.Email, existingEmails);
		var phone = Phone.Create(command.Phone, existingPhones);

		var passwordHash = passwordHasher.Generate(command.Password);
		var password = Password.Create(passwordHash);

		if (email.IsError)
			errors.AddRange(email.Errors);
		if (phone.IsError)
			errors.AddRange(phone.Errors);
		if (password.IsError)
			errors.AddRange(password.Errors);
		if (errors.Count > 0)
			return errors;


		var user = User.Create(
			firstName: command.FirstName,
			lastName: command.LastName,
			email: email.Value,
			phone: phone.Value,
			password: password.Value
		);

		await userRepository.AddAsync(user);

		var token = jwtTokenGenerator.GenerateToken(user);

		return new AuthenticationResult(user, token);
	}
}
