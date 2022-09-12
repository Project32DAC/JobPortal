package com.app.dto;
import java.util.ArrayList;
import java.util.List;

import com.app.entities.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class EmployeeEditRequest {
	private Gender gender ;
    private double sscMarks ; 
    private double hscMarks ; 
    private double degreeMarks ; 
	private String graduation ;
	private String branch ;
    private double experience ;
    private long contact;
    private List<String> skills=new ArrayList<>();
}
