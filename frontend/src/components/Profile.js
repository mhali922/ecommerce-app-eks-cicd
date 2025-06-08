import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3002/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(res.data.user);
      } catch {
        alert('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {profile ? <pre>{JSON.stringify(profile, null, 2)}</pre> : 'Loading...'}
    </div>
  );
};

export default Profile;

