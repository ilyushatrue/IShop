using ErrorOr;

namespace Flags.Domain.Common.Errors;
public static partial class Errors
{
    public static class App
    {
        public static Error CancellationRequested => Error.Failure(
            code: "App.CancellationRequested",
            description: "Cancellation requested."
        );
    }
}