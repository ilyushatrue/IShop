using Flags.Application.Common.Interfaces.Services;

namespace Flags.Infrastructure.Services;
public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
