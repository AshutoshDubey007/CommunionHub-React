import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { addEventData, getEventById, getUserData, updateInDb, uploadFile } from "../../supabase-service";
import { toast } from "react-toastify";
import { constVariables } from "../../utils/constVariables";
import { useLoader } from "../../context/LoaderContext";

export default function EventForm({ close, id, fetchData }) {
  const { setLoading } = useLoader();

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    image: "",
    location: "",
    category: "",
    desc: "",
    user_id: ""
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const fetchEvent = async (id) => {
    setLoading(true);
    try {
      const data = await getEventById(id, constVariables.TABLES.EVENT);
      setEventData(prev => ({
        ...prev,
        image: data?.image,
        title: data?.title,
        desc: data?.desc,
        user_id: data?.user_id,
        category: data?.category,
        location: data?.location,
        date: data?.date,
      }));
    } catch (error) {
      toast.error("Failed to fetch event details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await getUserData();
    if (response?.error) {
      toast.error("Error fetching user data");
    } else {
      setEventData(prev => ({ ...prev, user_id: response?.user?.id }));
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files?.[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let finalImageUrl = eventData?.image;
      if (image) {
        finalImageUrl = await uploadFile(image, constVariables.BUCKETS.EVENT);
      }
      await saveEvent(finalImageUrl);
    } catch (error) {
      toast.error("Error saving event: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveEvent = async (imageUrl) => {
    const payload = { ...eventData, image: imageUrl };
    try {
      if (id) {
        await updateInDb(id, payload, constVariables.TABLES.EVENT);
        toast.success("Event updated successfully");
      } else {
        await addEventData(payload, constVariables.TABLES.EVENT);
        toast.success("Event created successfully");
      }
      close();
      fetchData();
      resetForm();
    } catch (error) {
      toast.error("Error saving event");
    }
  };

  const resetForm = () => {
    setEventData({
      title: "",
      date: "",
      image: "",
      location: "",
      category: "",
      desc: "",
      user_id: ""
    });
    setImage(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xl bg-opacity-20">
        <div className="bg-white relative mt-20 text-black px-6 py-4 rounded-lg w-100 shadow-lg">
          <button onClick={close} className="absolute top-3 right-3 text-gray-900 hover:text-gray-800">
            <RxCross2 size={18} />
          </button>

          <h2 className="text-xl font-bold mb-4">{id ? "Edit Event" : "Create Event"}</h2>

          <div className="space-y-3">
            {['Title', 'Date', 'Location', 'Description'].map((label, index) => (
              <div key={index}>
                <label className="block mb-1 text-sm">{label}</label>
                <input
                  type={label === 'Date' ? 'date' : 'text'}
                  value={eventData[label.toLowerCase()]}
                  onChange={(e) => setEventData({ ...eventData, [label.toLowerCase()]: e.target.value })}
                  className="w-full bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            <div>
              <label className="block mb-1 text-sm">Image</label>
              <input type="file" onChange={handleFileChange} accept="image/*" className="w-full bg-gray-100 rounded-lg p-2 file:bg-gray-300 file:border-none file:text-black" />
            </div>

            <div>
              <label className="block mb-1 text-sm">Category</label>
              <select
                onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                value={eventData?.category}
                className="w-full bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option>Select Category</option>
                <option>Charity</option>
                <option>Religious</option>
                <option>Social</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={handleSubmit} className="px-4 py-1 bg-black text-white rounded-lg hover:bg-gray-800">
                {id ? "Edit" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
