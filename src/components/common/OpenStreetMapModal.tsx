import React from 'react';
import { X, MapPin, Navigation, ShieldCheck, ExternalLink } from 'lucide-react';

interface OpenStreetMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  locationName: string;
  pickupPoint: string;
  lat: number;
  lng: number;
}

export const OpenStreetMapModal: React.FC<OpenStreetMapModalProps> = ({
  isOpen,
  onClose,
  title,
  locationName,
  pickupPoint,
  lat,
  lng,
}) => {
  if (!isOpen) return null;

  // OpenStreetMap embed bbox calculation (~0.01 degree range around location)
  const delta = 0.008;
  const minLng = (lng - delta).toFixed(4);
  const minLat = (lat - delta).toFixed(4);
  const maxLng = (lng + delta).toFixed(4);
  const maxLat = (lat + delta).toFixed(4);

  const osmIframeUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lng}`;
  const externalOsmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-gradient-to-r from-blue-50/70 to-indigo-50/70">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                OpenStreetMap Campus Meetup
              </span>
              <h3 className="font-bold text-slate-900 text-base leading-tight">
                {pickupPoint || locationName}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/80 transition cursor-pointer"
            aria-label="Close map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map View Container */}
        <div className="relative w-full h-80 bg-slate-100">
          <iframe
            title="OpenStreetMap Campus Location"
            src={osmIframeUrl}
            className="w-full h-full border-0"
            loading="lazy"
          />

          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live OpenStreetMap Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}
          </div>
        </div>

        {/* Safe Meetup Guidelines */}
        <div className="p-5 bg-slate-50 border-t border-slate-200/80 space-y-3">
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200/80 rounded-2xl p-3.5">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 space-y-1">
              <p className="font-bold">Campus Safe Exchange Zone:</p>
              <p className="text-blue-800">
                Always arrange handoffs in well-lit public campus spots (e.g. library entrance, college coffee house, metro gates). Inspect the book condition before finalizing payment.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <a
              href={externalOsmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
            >
              Open in OpenStreetMap Web
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2 rounded-xl transition cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
