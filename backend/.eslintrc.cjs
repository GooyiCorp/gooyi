module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "standard",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    rules: {
        '@ts-safeql/check-sql': [
            'error',
            {
                connections: [
                    {
                        connectionUrl: process.env.DATABASE_URL,
                        // The migrations path:
                        migrationsDir: './prisma/migrations',
                        targets: [
                            // This makes `prisma.$queryRaw` and `prisma.$executeRaw` commands linted
                            { tag: 'prisma.+($queryRaw|$executeRaw)', transform: '{type}[]' },
                        ],
                    },
                ],
            },
        ],
    },
    "plugins": [
        "@ts-safeql/eslint-plugin"
    ]
}
