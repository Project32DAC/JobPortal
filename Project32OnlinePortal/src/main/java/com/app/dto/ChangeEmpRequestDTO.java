package com.app.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChangeEmpRequestDTO {
	
	private double experience ;
	
    
    private List<String> skills=new ArrayList<>();
	
	
	
}
