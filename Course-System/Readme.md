Course-System

Create the backend app, consider followings:

Write a model for Class and Student

class should have title, start, end, type [web Dev, Marking], participants
student should have fullname, phone , address, dob}
participants in class collection is an array of students.
Complete the following end points:

classes router:

post /classes/ to add a new class
get /classes/all to get the list of all classes
get /classes/:sid to get the list of all classes of a student with sid.
students router:

post /students/ to add a new student
get /students/all to get the list of all students
get /students/:cid to get the list of students of a class with cid.
Note: Please use populate() to show the details of reference field.