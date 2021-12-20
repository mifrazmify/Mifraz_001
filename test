

import java.io.File;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class test
 */
public class test extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	public void init() throws ServletException {
        System.out.println("----------");
        System.out.println("---------- CrunchifyServletExample Initialized successfully ----------");
        System.out.println("----------\n");
 
        // System.out.println("App Deployed Directory path: " +
        // this.getServletContext().getRealPath("/"));
        System.out.println("App Deployed Directory path: " + this.getServletContext().getRealPath(File.separator));
        System.out.println("getContextPath(): " + this.getServletContext().getContextPath());
        System.out.println("Apache Tomcat Server: " + this.getServletContext().getServerInfo());
        System.out.println("Servlet API version: " + this.getServletContext().getMajorVersion() + "."
                + this.getServletContext().getMinorVersion());
        System.out.println("Tomcat Project Name: " + this.getServletContext().getServletContextName());
    }

}
