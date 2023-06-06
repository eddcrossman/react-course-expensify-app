const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },

		target: ['web', 'es5'],
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						// targets: 'defaults',
						presets: [
							// ['@babel/preset-env', { 'useBuiltIns': 'entry' }],
							['@babel/preset-env', 
								{ 
									'useBuiltIns': 'entry',
									'corejs': '^3.30.2',
									/* 'targets': {
												'esmodules': true,
												'ie': '11'
												} */
								}
							],
							'@babel/preset-react'
						]/* ,					
						plugins: ['@babel/plugin-proposal-class-properties']  */		// Plugin now included within '@babel/preset-env'
					}
				}
			}, {



        // module: {
        //     rules: [{
        //         test: /\.js$/,
        //         exclude: /node_modules/,
        //         use: {
        //             loader: 'babel-loader',
        //             options: {
        //                 presets: ['@babel/preset-env', '@babel/preset-react']
        //             }
        //         }                
        //     },{
                test: /\.s?css$/,
                use: [ MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({ 
                filename: 'styles.css'
            }),
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY' : JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN' : JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL' : JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID' : JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET' : JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDERID' : JSON.stringify(process.env.FIREBASE_MESSAGING_SENDERID),
                'process.env.FIREBASE_APP_ID' : JSON.stringify(process.env.FIREBASE_APP_ID),
                'process.env.FIREBASE_MEASUREMENT_ID' : JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)

            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
        devServer: {
            static: {
                directory: path.join(__dirname, 'public')
            },
            historyApiFallback: true,
            devMiddleware: {
                publicPath: '/dist/'
              },
        }
    };
};