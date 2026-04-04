
package com.hostel.controller;

import com.hostel.entity.Student;
import com.hostel.service.StudentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Student> getStudents() {
        return service.getAll();
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return service.save(student);
    }
}
