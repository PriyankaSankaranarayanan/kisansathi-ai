import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { detectDisease, imageUrl } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

export default function DiseaseDetection({ onSuccess }) {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFile = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setFile(selected);
    setResult(null);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selected);
  };

  const handleDetect = async () => {
    if (!file) {
      toast.error('Please upload a crop leaf image first');
      return;
    }

    setLoading(true);
    try {
      const { data } = await detectDisease(file);
      setResult(data.data);
      toast.success('Disease analysis complete');
      onSuccess?.();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setFile(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="card">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">🔬</span>
        <div>
          <h2 className="font-display text-xl font-bold">Crop Disease Detection</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload a leaf photo for instant analysis
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label
            htmlFor="crop-image"
            className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-farm-300 bg-farm-50/50 p-6 transition hover:border-farm-500 dark:border-farm-700 dark:bg-farm-900/20"
          >
            {preview ? (
              <img src={preview} alt="Crop preview" className="max-h-48 rounded-lg object-contain" />
            ) : (
              <>
                <span className="text-4xl">📷</span>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  Click to upload crop leaf image
                </p>
                <p className="text-xs text-gray-400">JPG, PNG, WEBP — max 5MB</p>
              </>
            )}
            <input
              id="crop-image"
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={handleDetect} disabled={loading || !file} className="btn-primary">
              {loading ? 'Analyzing...' : 'Detect Disease'}
            </button>
            {(preview || result) && (
              <button type="button" onClick={reset} className="btn-secondary">
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-farm-50/80 p-5 dark:bg-gray-900/50">
          {loading && <LoadingSpinner label="Analyzing crop image..." />}

          {!loading && !result && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Results will appear here after detection
            </p>
          )}

          {!loading && result && (
            <div className="space-y-4">
              {result.imageUrl && (
                <img
                  src={imageUrl(result.imageUrl)}
                  alt="Analyzed crop"
                  className="h-32 w-full rounded-lg object-cover"
                />
              )}
              <div>
                <span className="rounded-full bg-farm-600 px-3 py-1 text-xs font-semibold text-white">
                  {result.confidence} confidence
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-farm-800 dark:text-farm-300">
                  {result.disease}
                </h3>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500">Description</p>
                <p className="mt-1 text-sm">{result.description}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500">Recommended Treatment</p>
                <p className="mt-1 text-sm text-farm-800 dark:text-farm-200">{result.treatment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
