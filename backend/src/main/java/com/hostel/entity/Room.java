
package com.hostel.entity;

import jakarta.persistence.*;

@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomNumber;
    private int capacity;

    public Long getId(){ return id; }
    public void setId(Long id){ this.id=id; }

    public String getRoomNumber(){ return roomNumber; }
    public void setRoomNumber(String roomNumber){ this.roomNumber=roomNumber; }

    public int getCapacity(){ return capacity; }
    public void setCapacity(int capacity){ this.capacity=capacity; }
}
