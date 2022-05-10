-- Izveido tabulu kas satur režģa lielumu
CREATE TABLE path_size (id int PRIMARY KEY AUTO_INCREMENT, size varchar(255))

-- Izveido one-to-many tabulu kas satur režģa lieluma id, koordinātes, un nosaukumu
CREATE TABLE path_coord (coordId int PRIMARY KEY AUTO_INCREMENT, sizeId int, FOREIGN KEY(sizeId) REFERENCES path_size(id), coord text, name varchar(255))

-- Dabū visas koordinātes no norādītā režga lieluma
SELECT coord FROM path_coord JOIN path_size ON path_size.id = path_coord.sizeId WHERE size = $size;

-- Ievada koordinātes 
INSERT INTO path_coord (sizeId, coord, name) VALUES (1, '1,4-2,2-3,1-3,4', 'Custom-1');

-- Saglabā režģa sienu novietojumus attiecīgajā vietā
UPDATE path_coord SET coord = ? WHERE name=?;