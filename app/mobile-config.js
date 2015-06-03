// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
	id: 'uk.org.inspire-me',
	name: 'Inspire Me',
	description: 'Inspiring stories for care leavers by care leavers',
	author: 'NIACE',
	email: 'kevin.campbellwright@niace.org.uk',
	website: 'http://www.niace.org.uk',
	version: '0.0.1'
});

// Set up resources such as icons and launch screens.
App.icons({
	// iphone: '',
	// iphone_2x: '',
	// iphone_3x: '',
	// ipad: '',
	// ipad_2x: '',
	android_ldpi: 'mobile-app-resources/android_icon.ldpi.png',
	android_mdpi: 'mobile-app-resources/android_icon.mdpi.png',
	android_hdpi: 'mobile-app-resources/android_icon.hdpi.png',
	android_xhdpi: 'mobile-app-resources/android_icon.xhdpi.png'
});

App.launchScreens({
	// iphone: '',
	// iphone_2x: '',
	// iphone5: '',
	// iphone6: '',
	// iphone6p_portrait: '',
	// iphone6p_landscape: '',
	// ipad_portrait: '',
	// ipad_portrait_2x: '',
	// ipad_landscape: '',
	// ipad_landscape_2x: '',
	android_ldpi_portrait: 'mobile-app-resources/android_launch_screen.portrait.ldpi.png',
	android_ldpi_landscape: 'mobile-app-resources/android_launch_screen.landscape.ldpi.png',
	android_mdpi_portrait: 'mobile-app-resources/android_launch_screen.portrait.mdpi.png',
	android_mdpi_landscape: 'mobile-app-resources/android_launch_screen.landscape.mdpi.png',
	android_hdpi_portrait: 'mobile-app-resources/android_launch_screen.portrait.hdpi.png',
	android_hdpi_landscape: 'mobile-app-resources/android_launch_screen.landscape.hdpi.png',
	android_xhdpi_portrait: 'mobile-app-resources/android_launch_screen.portrait.xhdpi.png',
	android_xhdpi_landscape: 'mobile-app-resources/android_launch_screen.landscape.xhdpi.png'
});

// Set PhoneGap/Cordova preferences
// App.setPreference('BackgroundColor', '0xff0000ff');
