import Link from "next/link";

const Form = ({
  update,
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  reminder,
  setReminder,
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    setPost((prev) => {
      const name = e.target.name;
      const value = e.target.value;

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChange2 = (e) => {
    e.preventDefault(
      setReminder((prev) => {
        const value = e.target.value;
        prev.push({
          timeBefore: value,
          isSent: false,
        });
      })
    );
  };

  function getDateString(fullDateTimeString) {
    const dateObj = new Date(fullDateTimeString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    const dateString = `${year}-${month}-${day}`;
    return dateString;
  }
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Event</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 mb-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            value={post.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            name="date"
            type="date"
            onChange={handleChange}
            value={update ? getDateString(post.date) : post.date}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="time"
          >
            Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            name="time"
            type="time"
            value={post.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="Enter description"
            required
            value={post.description}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Reminders
          </label>

          <div>
            <label className="block">
              <input
                type="checkbox"
                className="mr-2 leading-tight"
                name="checkbox"
                value="0.0833"
                required
                onChange={handleChange}
              />
              5 min before
            </label>

            {/* <!-- Add more reminder options as needed --> */}
          </div>
        </div>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {" "}
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
