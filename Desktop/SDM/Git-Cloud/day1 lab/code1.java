//1. Write a java program to swap two numbers stored in local variables?

//import java.util.*;
public class p1 {
	public static void main(String args[]){
	   int a=10;
	   int b=20;
	   System.out.println("before swap"+ " a="+a+ "  b="+b);
	   int t=a;
	   a=b;
	   b=t;
	   System.out.println("After swap" + "  a=" +a+  "  b="+b);
	}
}