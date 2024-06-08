using ErrorOr;

namespace Flags.Domain.Common.Errors;

public static partial class Errors
{
    public static class Media
    {
        public static Error ImageNotFound => Error.NotFound(
            code: "Media.ImageNotFound",
            description: "Изображения не существует."
        );
    }
}