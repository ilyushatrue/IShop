FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
RUN mkdir -p /app/uploads && chown -R app:app /app/uploads
USER app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["IShop.Api/IShop.Api.csproj", "IShop.Api/"]
COPY ["IShop.Contracts/IShop.Contracts.csproj", "IShop.Contracts/"]
COPY ["IShop.Application/IShop.Application.csproj", "IShop.Application/"]
COPY ["IShop.Domain/IShop.Domain.csproj", "IShop.Domain/"]
COPY ["IShop.Infrastructure/IShop.Infrastructure.csproj", "IShop.Infrastructure/"]
RUN dotnet restore "./IShop.Api/IShop.Api.csproj"
COPY . .
WORKDIR "/src/IShop.Api"
RUN dotnet build "./IShop.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./IShop.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IShop.Api.dll"]