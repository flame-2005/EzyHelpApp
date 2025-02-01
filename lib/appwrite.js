import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aura",
  projectId: "67766bdd002e630b6feb",
  storageId: "67766eca000c8f163884",
  databaseId: "67766d1a0034003d23ee",
  userCollectionId: "67766d41001755ac9f7b",
  videoCollectionId: "660d157fcb8675efe308",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Edit Profile
export async function editProfile(username, email, newPassword, currentPassword) {
  try {
    // Ensure the user is logged in
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("User not authenticated");

    // Update email if provided
    if (email) {
      await account.updateEmail(email, currentPassword); // Use currentPassword to authenticate
    }

    // Update password if provided
    if (newPassword) {
      await account.updatePassword(newPassword, currentPassword); // Use currentPassword to authenticate
    }

    // Update username and avatar in the database
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not found");

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      currentUser.$id, // Use the current user's document ID
      {
        username: username || currentUser.username,
        email: email || currentUser.email,
        avatar: avatars.getInitials(username || currentUser.username), // Update avatar if username changes
      }
    );

    return updatedUser;
  } catch (error) {
    throw new Error(error.message || "Failed to update profile.");
  }
}