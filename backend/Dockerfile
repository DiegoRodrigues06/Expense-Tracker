# Etapa 1 - Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia o csproj e restaura dependências
COPY *.csproj ./
RUN dotnet restore

# Copia o restante dos arquivos
COPY . ./

RUN dotnet publish -c Release -o /out

# Etapa 2 - Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /out .
COPY expense.db /app/expense.db

EXPOSE 5208

ENTRYPOINT ["dotnet", "backend.dll"]
