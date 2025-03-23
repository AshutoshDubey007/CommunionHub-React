import supabase from "./supabaseConfig";

export const signup = async (payload) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: payload?.email,
        password: payload?.password,
      });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
}

export const login = async (payload) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: payload?.email,
            password: payload?.password,
        });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export const signOut = async() => {
    try {
        const data = await supabase.auth.signOut()
        if (data?.error) {
            throw new Error(error?.message)
        }
        return data;
    } catch {
        throw error;
    }
} 

export const getUserData = async() => {
    try {
        const { data, error } = await supabase.auth.getUser()
        return data;
    } catch (error) {
        throw error;
    }
}

export const uploadFile = async(image, folder) => {
    try {
        if (!image) {
            return null;
        }
        const { data, error } = await supabase.storage
            .from(folder)
            .upload(`public/${Date.now()}_${image.name}`, image);
        if (error) {
            return null;
        }
        return `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
    } catch (error) {
        return null;
    }
}

export const addEventData = async(payload, table) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .insert([
                payload
            ]);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error(`Error inserting user data: ${error.message}`);
    }
};

export const getEventById = async(id, table) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            return null;
        }
        return data;
    } catch (error) {
        return null;
    }
}

export const updateInDb = async (id, payload, table) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .update(payload)
            .eq('id', id)
            .select();
        if (error) {
            throw new Error(`Error: ${error.message}`);
        }
        if (data.length === 0) {
            return null;
        }
        return data;
    } catch (error) {
        throw new Error(`Error updating data: ${error.message}`);
    }
};

export const getEventFromDb = async(table) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .select("*")
        if (error) {
            throw new Error(error.message);
        }
        return { data };
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
};

export const deleteFromDb = async (table, id) => {
    try {
        const { error, data } = await supabase.from(table).delete().eq('id', id);
        if (error) throw error;
        return data;
    } catch (error) {
        throw new Error('Failed to delete the document.');
    }
};

export const getEventWithFilters = async(table, key, value) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .select("*")
            .eq(key, value)
        if (error) {
            throw new Error(error?.message);
        }
        return { data };
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
};

export const isLogedIn = async() => {
    const { data, error } = await supabase.auth.getSession();
    return data?.session?.user || null;
}