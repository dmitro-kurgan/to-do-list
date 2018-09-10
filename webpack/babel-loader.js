module.exports = function() {
	return {
		module: {
		    loaders: [
		      {
		        test: /\.js$/,
		        loader: 'babel-loader',
		        query: {
		          presets: ['es2015']
		        }
		      }
		    ]
		}
	};
};