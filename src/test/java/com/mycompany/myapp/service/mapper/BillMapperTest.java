package com.mycompany.myapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BillMapperTest {

    private BillMapper billMapper;

    @BeforeEach
    public void setUp() {
        billMapper = new BillMapperImpl();
    }
}
