const config  = { 
    PORT: process.env.PORT || 4000,
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    ANTHROPIC_API: process.env.ANTHROPIC_API || '',
}

export = config
