import { useState } from 'react';
import handler from '@/lib/openai/OpenaiService';

interface FormValues {
  departureDate: string;
  returnDate: string;
  startingPoint: string;
  destinationPoint: string;
  travelType: 'Solo' | 'Couple' | 'Group';
  awayFromMassTourism: boolean;
  activities?: string;
  preferredStopoverLocations?: string;
}

const TravelForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    departureDate: '',
    returnDate: '',
    startingPoint: '',
    destinationPoint: '',
    travelType: 'Solo',
    awayFromMassTourism: false,
    activities: '',
    preferredStopoverLocations: '',
  });
  const [response, setResponse] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        departureDate: '2023-07-01',
        returnDate: '2023-07-15',
        startingPoint: '北京',
        destinationPoint: '上海',
        travelType: 'Solo',
        awayFromMassTourism: true,
        activities: '徒步, 摄影',
        preferredStopoverLocations: '南京, 苏州',
      }),
    });

    const data = await res.json();
    debugger;

    setResponse(data.result.choices[0].message.content);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">
          AI定制-请输入你的计划
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="departureDate"
            >
              出发日期
            </label>
            <input
              type="date"
              name="departureDate"
              id="departureDate"
              value={formValues.departureDate}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="returnDate"
            >
              返程日期
            </label>
            <input
              type="date"
              name="returnDate"
              id="returnDate"
              value={formValues.returnDate}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="startingPoint"
            >
              出发地
            </label>
            <input
              type="text"
              name="startingPoint"
              id="startingPoint"
              value={formValues.startingPoint}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter starting point"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="destinationPoint"
            >
              目的地
            </label>
            <input
              type="text"
              name="destinationPoint"
              id="destinationPoint"
              value={formValues.destinationPoint}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter destination point"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="travelType"
            >
              You are traveling
            </label>
            <select
              name="travelType"
              id="travelType"
              value={formValues.travelType}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option value="Solo">单人</option>
              <option value="Couple">情侣</option>
              <option value="Group">团队</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="awayFromMassTourism"
                checked={formValues.awayFromMassTourism}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">避免大众游</span>
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="activities"
            >
              所需活动 (可选)
            </label>
            <textarea
              name="activities"
              id="activities"
              value={formValues.activities}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter activities"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="preferredStopoverLocations"
            >
              中途停留地点 (可选)
            </label>
            <textarea
              name="preferredStopoverLocations"
              id="preferredStopoverLocations"
              value={formValues.preferredStopoverLocations}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter preferred stopover locations"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              生成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelForm;