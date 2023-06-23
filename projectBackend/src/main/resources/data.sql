
INSERT INTO role (id, role)
VALUES (1, 'ADMIN');
INSERT INTO role (id, role)
VALUES (2, 'OWNER');
INSERT INTO role (id, role)
VALUES (3, 'CUSTOMER');

INSERT INTO users (id, email, firstname, lastname, password, status, is_send, role_id)
VALUES (11, 'admin@gmail.com', 'john', 'smith', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2', 0, false, 1); --123
INSERT INTO users (id, email, firstname, lastname, password, status, is_send, role_id)
VALUES (12, 'owner@gmail.com', 'jane', 'doe', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2', 1, false, 2); --123
INSERT INTO users (id, email, firstname, lastname, password, status, is_send, role_id)
VALUES (13, 'customer@gmail.com', 'robert', 'lee', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2', 0, false, 3); --123
INSERT INTO users (id, email, firstname, lastname, password, status, is_send, role_id)
VALUES (14, 'customer2@gmail.com', 'test', 'test', '$2a$12$IKEQb00u5QpZMx4v5zMweu.3wrq0pS7XLCHO4yHZ.BW/yvWu1feo2', 0, true, 2); --123


insert into address(id, state, city, street, zipcode)
values (101, 'FL', 'Naples', '2063 24th Ave NE', 34120);
insert into address(id, state, city, street, zipcode)
values (102, 'FL', 'Naples', '170 Oceans Blvd Unit 170', 34104);
insert into address(id, state, city, street, zipcode)
values (103, 'FL', 'Naples', '615 Bougainvillea Ct Unit 615', 34110);


insert into property (id, name, bed_no, bath_no, sqft, garage_no, price, address_id, owner_id)
values(1, 'PropertyTitle1', 3, 2, 1806, 2, 23000, 101, 12);
insert into property (id, name, bed_no, bath_no, sqft, garage_no, price, address_id, owner_id)
values(2, 'PropertyTitle2', 2, 2, 1352, 0, 21500, 102, 12);
insert into property (id, name, bed_no, bath_no, sqft, garage_no, price, address_id, owner_id)
values(3, 'PropertyTitle3', 1, 1, 784, 1, 16500, 103, 12);

insert into offer(id, status, customer_id, property_id)
values(1, 'PENDING', 13, 1);
insert into offer(id, status, customer_id, property_id)
values(2, 'SOLD', 13, 2);
insert into offer(id, status, customer_id, property_id)
values(3, 'PENDING', 13, 3);

insert into message(id, message, customer_id, owner_id, property_id)
values(1, 'Interested in your property. Can we discuss further?', 13, 12, 1);
insert into message(id, message, customer_id, owner_id, property_id)
values(2, 'Love this property', 13, 12, 2);

INSERT INTO saved (id, customer_id, property_id)
VALUES (1, 13, 3);