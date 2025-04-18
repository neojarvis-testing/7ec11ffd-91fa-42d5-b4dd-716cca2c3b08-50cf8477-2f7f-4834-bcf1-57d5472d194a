package com.examly.springapp;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;
import jakarta.persistence.ManyToOne;

@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class FeedbackAndSchoolApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void backend_testManyToOneAnnotationPresentInAppointment() {
        try {
            Class<?> AppointmentClass = Class.forName("com.examly.springapp.model.Appointment");
            Field usersField = AppointmentClass.getDeclaredField("user");
            assertNotNull(usersField.getAnnotation(ManyToOne.class),
                    "@ManyToOne annotation should be present on 'users' field in Appointment class");
        } catch (ClassNotFoundException | NoSuchFieldException e) {
            fail("Field 'user' or Appointment class not found.");
        }
    }
    
    @Test
    public void backend_testManyToOneAnnotationPresentInFeedback() {
        try {
            Class<?> FeedbackClass = Class.forName("com.examly.springapp.model.Feedback");
            Field usersField = FeedbackClass.getDeclaredField("user");
            assertNotNull(usersField.getAnnotation(ManyToOne.class),
                    "@ManyToOne annotation should be present on 'users' field in Feedback class");
        } catch (ClassNotFoundException | NoSuchFieldException e) {
            fail("Field 'user' or Feedback class not found.");
        }
    }
   
   

    @Test
    void backend_testControllerFolder() {
        String directoryPath = "src/main/java/com/examly/springapp/controller";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void backend_testAppointmentControllerFile() {
        String filePath = "src/main/java/com/examly/springapp/controller/AppointmentController.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void backend_testFeedbackControllerFile() {
        String filePath = "src/main/java/com/examly/springapp/controller/FeedbackController.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }
    @Test
    void backend_testVehicleServiceControllerFile() {
        String filePath = "src/main/java/com/examly/springapp/controller/VehicleServiceController.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void backend_testModelFolder() {
        String directoryPath = "src/main/java/com/examly/springapp/model";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void backend_testFeedbackModelFile() {
        String filePath = "src/main/java/com/examly/springapp/model/Feedback.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void backend_testAppointmentFile() {
        String filePath = "src/main/java/com/examly/springapp/model/Appointment.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void backend_testRepositoryFolder() {
        String directoryPath = "src/main/java/com/examly/springapp/repository";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void backend_testFeedbackRepoFile() {
        String filePath = "src/main/java/com/examly/springapp/repository/FeedbackRepo.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void backend_testAppointmentRepoFile() {
        String filePath = "src/main/java/com/examly/springapp/repository/AppointmentRepo.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

	@Test
    void backend_testServiceFolder() {
        String directoryPath = "src/main/java/com/examly/springapp/service";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void backend_testFeedbackServiceFile() {
        String filePath = "src/main/java/com/examly/springapp/service/FeedbackService.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    
}
