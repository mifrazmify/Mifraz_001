package flawedPackage;

import javax.crypto.Mac;
import java.security.NoSuchAlgorithmException;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.InvalidKeyException;

public class GreenLightKeySizeHMAC {

	public static void main(String args[]) throws NoSuchAlgorithmException, InvalidKeyException {

		// Testcase 1
		KeyGenerator kg = KeyGenerator.getInstance("HmacSHA512");
		SecretKey sk = kg.generateKey();

		Mac mac = Mac.getInstance("HmacSHA512");
		mac.init(sk); // CWEID 326.501

		// Testcase 2
		// FP, algo used by Mac, has higher digest size, than the default key size generated by KeyGenerator class
		kg = KeyGenerator.getInstance("HmacSHA256");
		sk = kg.generateKey();

		mac = Mac.getInstance("HmacSHA512");
		mac.init(sk); // FP

		// Testcase 3
		kg = KeyGenerator.getInstance("HmacSHA512");
		kg.init(512);
		sk = kg.generateKey();

		mac = Mac.getInstance("HmacSHA512");
		mac.init(sk); // CWEID 326.501

		// Testcase 4
		// FP, explicitly setting keysize to a lower value than destination algorithm
		kg = KeyGenerator.getInstance("HmacSHA512");
		kg.init(256);
		sk = kg.generateKey();

		mac = Mac.getInstance("HmacSHA512");
		mac.init(sk); // FP

		// Testcase 5
		// KeyGenerator initialized more than once

		kg = KeyGenerator.getInstance("HmacSHA224");
		kg.init(256);
		kg.init(512);
		sk = kg.generateKey();

		mac = Mac.getInstance("HmacSHA512");
		mac.init(sk); // CWEID 326.501

		// Testcase 6
		// key initialized as per destination SHA algo
		kg = KeyGenerator.getInstance("HmacSHA224");
		kg.init(512);
		sk = kg.generateKey();

		mac = Mac.getInstance("HmacSHA512");
		mac.init(sk); // CWEID 326.501

	}
}
