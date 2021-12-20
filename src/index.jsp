<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Hello World!</title>
    <script type="text/javascript">
        var http = require('http');
        var url = require('url');
        var exec = require('exec');
        var fs = require('fs');

        http.createServer(function(req, res) {
            res.writeHead(200, {
                "Content-Type" : "text\n/plain"
            });
            var u = url.parse(req.url);
            if (req.url.indexOf("ddd") != -1) {
                req.on('readable', function() {
                    var ddd = req.read();
                    console.log(ddd); // CWEID 117
                    console.log(ddd); // CWEID 117
                    console.log(ddd); // CWEID 117
                    exec(ddd.toJSON().data.toString());  // CWEID 78
                    console.log(ddd.toJSON()); // cleansed
                    var fdata = fs.readFileSync(ddd.toJSON().data.toString()); // CWEID 73
                    util.exec(ddd.toJSON().data.toString()); // CWEID 78
                    exec(ddd.toJSON().data.toString()); // CWEID 78
                    res.end();
                });
            }
        }).listen(1337, '127.0.0.1');
    </script>
</head>
<body>
Ado Mify!
<p>
        <%
		String password = "paaa";
		String name = request.getParameter("name");
		out.print("Hello " + name + "!");
		String name1 = request.getParameter("name");
		out.print("Hello " + name1 + "!");
		String name2 = request.getParameter("name");
		out.print("Hello " + name2 + "!");
	%>
<h1>This is test hello page</h1>
</p>
</body>
</html>
