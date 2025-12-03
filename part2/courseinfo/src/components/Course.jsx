const CourseHeader = ({ course }) => <h2>{course.name}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Total = ({ parts }) => {
  let total = parts.reduce((sum, part) => {
    sum += part.exercises;
    return sum;
  }, 0);

  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

function Course({ course }) {
  return (
    <div>
      <CourseHeader course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default Course;
