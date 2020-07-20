package com.expensetracker.backend.repository;

import com.expensetracker.backend.model.Category;
import com.expensetracker.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  Optional<List<Category>> findAllByUser(User user);

}
