function FirstView() {
	var self = Ti.UI.createView({
        layout: 'vertical',
        backgroundColor: '#ccc'
    });
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		text:L('login'),
		height:'auto',
        top: '20dip',
		width:'auto'
	});

    var logintf = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FULL,
        top: '50dip',
        hintText: L('username')
    });
    var pwtf = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FULL,
        passwordMask: true,
        top: '10dip',
        hintText: L('password')
    });
    if(Ti.App.Properties.hasProperty("saved_username")) {
        logintf.setValue(Ti.App.Properties.getString('saved_username'));
        if(Ti.App.Properties.hasProperty("saved_password")) {
            pwtf.setValue(Ti.App.Properties.getString("saved_password"));
        }
    }

    var lbutton = Ti.UI.createButton({ 
        top: '20dip',
        title: L('login'),
    });
    var cancelbutton = Ti.UI.createButton({
        top: '20dip',
        title: L('clear'),
    });
    var activityIndicator = Ti.UI.createActivityIndicator({
        color: '#888',
        font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
        message: L('loading'),
        top:10,
        left:10,
        height:Ti.UI.SIZE,
        width:Ti.UI.SIZE
    });
    var sendLocation = function() {
        Ti.Geolocation.purpose = ' ';
        Ti.Geolocation.getCurrentPosition(function(loc) {
            var hcli = Ti.Network.createHTTPClient({
                validatesSecureCertificate: Ti.App.SHOULDVALIDATE,          // CWEID 297
                timeout: 2000
            });
            var url = Ti.App.MAINURL + '/loctrack';
            hcli.open("POST", url);
            hcli.send({
                sessionid: Ti.App.sessionid,
                lat: loc.coords.latitude,
                lon: loc.coords.longitude,
            });     // CWEID 201
        });
    }
    var MainWindow = require('ui/common/MainWindow');
    lbutton.addEventListener('click', function(e) {
        activityIndicator.show();
        var hcli = Ti.Network.createHTTPClient({
            validatesSecureCertificate: Ti.App.SHOULDVALIDATE,          // CWEID 297
            onload: function(e) {
                activityIndicator.hide();

                var respdata = JSON.parse(this.responseText);
                Ti.API.info(respdata);
                if(respdata.hasOwnProperty('success') && respdata.success && respdata.hasOwnProperty("sessionid")) {
                    Ti.API.info("login success -- opening main window");
                    Ti.App.Properties.setString("saved_username", logintf.getValue());  // CWEID 259
                    Ti.App.Properties.setString("saved_password", pwtf.getValue());     // CWEID 259
                    Ti.App.sessionid = respdata.sessionid;
                    Ti.API.info("MainWindow: " + MainWindow);
                    new MainWindow().open();

                    sendLocation();
                } else {
                    Ti.API.info("login failure");
                }
            },
            onerror: function(e) {
                activityIndicator.hide();
                Ti.API.info("error: " + e.error);
                alert(string.format(L('neterr'), e.error));
            },
            timeout: 2000
        });
        Ti.App.Properties.removeProperty("saved_username");
        Ti.App.Properties.removeProperty("saved_password");
        var url = Ti.App.MAINURL + '/login';
        hcli.open("POST", url);
        hcli.send({
            username: logintf.getValue(),
            password: pwtf.getValue(),
            udid: Ti.App.DEVID,
        });     // CWEID 201
    });
    cancelbutton.addEventListener('click', function(e) {
        logintf.setValue('');
        pwtf.setValue('');
    });

	self.add(label);
    self.add(logintf);
    self.add(pwtf);
    self.add(lbutton);
    self.add(cancelbutton);
    self.add(activityIndicator);

	return self;
}

module.exports = FirstView;
