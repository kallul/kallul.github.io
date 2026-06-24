from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    APP_NAME: str = "Portfolio"
    DEBUG: bool = False

    # MongoDB — defaults to Atlas; override via MONGO_URI env var if needed
    MONGO_URI: str = (
        "mongodb+srv://kallulpt_db_user:6fxEUxPTWvODrste"
        "@clustera.fieldxl.mongodb.net/?appName=ClusterA"
    )
    MONGO_DB_NAME: str = "portfolio"

    # Security
    SECRET_KEY: str = "aiza-portfolio-secret-2026-xK9mP3qR"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Email
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    CONTACT_EMAIL: str = "aizamitukallul@gmail.com"


settings = Settings()
