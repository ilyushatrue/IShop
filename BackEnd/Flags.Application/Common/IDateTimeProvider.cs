﻿namespace Flags.Application.Common;
public interface IDateTimeProvider
{
    DateTime UtcNow { get; }
}
