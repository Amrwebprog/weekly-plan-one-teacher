import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { addDoc, collection, getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

/* const firebaseConfig = {
    apiKey: "AIzaSyB5Lg4TVQO4sNE4rYuzi0NzEnZm4ZSMzEk",
    authDomain: "weekly-plan-one.firebaseapp.com",
    projectId: "weekly-plan-one",
    storageBucket: "weekly-plan-one.appspot.com",
    messagingSenderId: "336937670479",
    appId: "1:336937670479:web:3284f4e43b94eed8d6973a",
    measurementId: "G-6PJJBS9QN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.weekly-plan-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        // التحقق من صحة البيانات
        const month = document.getElementById('month').value;
        const week = document.getElementById('week').value;
        const subject = document.getElementById('subject').value;
        const classroom = document.getElementById('classroom').value;
        const sundayPlan = document.getElementById('sunday-plan').value;
        const mondayPlan = document.getElementById('monday-plan').value;
        const tuesdayPlan = document.getElementById('tuesday-plan').value;
        const wednesdayPlan = document.getElementById('wednesday-plan').value;
        const thursdayPlan = document.getElementById('thursday-plan').value;

        // التحقق من عدم ترك أي حقل فارغ
        if (!month || !week || subject === "" || classroom === "" || sundayPlan === "" || mondayPlan === "" || tuesdayPlan === "" || wednesdayPlan === "" || thursdayPlan === "") {
            Swal.fire({
                title: 'خطأ!',
                text: 'يرجى ملء جميع الحقول المطلوبة.',
                icon: 'error',
                confirmButtonText: 'موافق'
            });
            return;
        }

        // إعداد اسم المجموعة (collection)
        const collectionName = `${new Date(month).getFullYear()}-${String(new Date(month).getMonth() + 1).padStart(2, '0')}-${week.toLowerCase()}`;

        // إعداد البيانات للإرسال إلى Firestore
        const data = {
            subject: subject,
            classroom: classroom,
            sunday: sundayPlan,
            monday: mondayPlan,
            tuesday: tuesdayPlan,
            wednesday: wednesdayPlan,
            thursday: thursdayPlan,
        };

        try {
            // إضافة وثيقة جديدة بمعرف فريد
            await addDoc(collection(db, collectionName), data);

            Swal.fire({
                title: 'نجاح!',
                text: 'تم إرسال البيانات بنجاح!',
                icon: 'success',
                confirmButtonText: 'موافق'
            });
        } catch (error) {
            console.error("خطأ في إرسال البيانات: ", error);
            Swal.fire({
                title: 'خطأ!',
                text: 'حدث خطأ أثناء إرسال البيانات.',
                icon: 'error',
                confirmButtonText: 'موافق'
            });
        }
    });
});
