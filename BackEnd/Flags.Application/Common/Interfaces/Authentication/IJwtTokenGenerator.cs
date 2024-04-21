﻿using Flags.Domain.UserEntity;

namespace Flags.Application.Common.Interfaces.Authentication;
public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}
