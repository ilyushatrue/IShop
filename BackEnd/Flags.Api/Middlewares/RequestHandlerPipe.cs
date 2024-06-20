using ErrorOr;
using Flags.Domain.Common.Errors;

namespace Flags.Api.Middlewares;

public static class RequestHandlerPipe
{
    public static async Task<ErrorOr<TOut>> ExecuteRequest<TOut>(
        Func<Task<ErrorOr<TOut>>> func,
        CancellationToken cancellationToken)
    {
        if (cancellationToken.IsCancellationRequested)
        {
            return Errors.App.CancellationRequested;
        }
        return await func();
    }
}
