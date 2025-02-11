module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // Injects styles into DOM
                    'css-loader',   // Translates CSS into CommonJS
                    'postcss-loader' // Processes CSS with PostCSS
                ],
            },
            // ... other rules ...
        ],
    },
    // ... other configurations ...
}; 