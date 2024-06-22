using Flags.Application.Common;

namespace Flags.Infrastructure.Services;
public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
