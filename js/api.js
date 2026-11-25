/**
 * Pharmacy Management System (El-Ezaby Pharmacy)
 * API Client & Data Engine: Direct RESTful API Client with SQL-Synced Local Engine
 */

const API_BASE_URL = 'http://localhost:5000/api';

const DB = {
  // Check if initial SQL data exists in storage, otherwise seed from SQLQuery1.sql datasets
  initData() {
    if (!localStorage.getItem('ezaby_db_seeded')) {
      this.seedInitialData();
    }
  },

  seedInitialData() {
    // 1. Warehouses (from SQL)
    const warehouses = [
      { warehouse_id: 1, warehouse_name: 'مستودع العزبي الرئيسي - مدينة نصر', capacity: 100000, governorate: 'القاهرة', city: 'مدينة نصر', street: 'شارع الطيران المنطقة الصناعية' },
      { warehouse_id: 2, warehouse_name: 'مستودع الدلتا اللوجستي - طنطا', capacity: 75000, governorate: 'الغربية', city: 'طنطا', street: 'طريق طنطا الإسكندرية الزراعي' },
      { warehouse_id: 3, warehouse_name: 'مستودع الإسكندرية الإقليمي - سموحة', capacity: 80000, governorate: 'الإسكندرية', city: 'سموحة', street: 'شارع فوزي معاذ خلف التأمين' },
      { warehouse_id: 4, warehouse_name: 'مستودع الجيزة المركزي - أكتوبر', capacity: 95000, governorate: 'الجيزة', city: '6 أكتوبر', street: 'المنطقة الصناعية الثالثة بلوك 12' },
      { warehouse_id: 5, warehouse_name: 'مستودع الصعيد الإمدادي - أسيوط', capacity: 60000, governorate: 'أسيوط', city: 'أسيوط', street: 'شارع الثورة بجوار مصنع المحالي' },
      { warehouse_id: 7, warehouse_name: 'مستودع مخزون الطوارئ - العبور', capacity: 90000, governorate: 'القليوبية', city: 'العبور', street: 'المنطقة الصناعية الأولى ب' },
      { warehouse_id: 10, warehouse_name: 'مستودع التوزيع السريع - التجمع', capacity: 70000, governorate: 'القاهرة', city: 'القاهرة الجديدة', street: 'المنطقة الصناعية التجمع الثالث' },
      { warehouse_id: 27, warehouse_name: 'مستودع القناطر والمنطقة الشمالية', capacity: 29000, governorate: 'القليوبية', city: 'القناطر الخيرية', street: 'كورنيش النيل بجوار المحكمة' },
      { warehouse_id: 30, warehouse_name: 'مستودع العاشر من رمضان الاستراتيجي', capacity: 85000, governorate: 'الشرقية', city: 'العاشر من رمضان', street: 'المنطقة الصناعية أ1 طريق الإسماعيلية' }
    ];

    // 2. Suppliers with phone numbers
    const suppliers = [
      { supplier_id: 1, email: 'info@pfizer.com.eg', company_name: 'شركة فايزر مصر للاستيراد والتصنيع', governorate: 'القاهرة', city: 'مصر الجديدة', street: 'شارع الأهرام الرئيسي', warehouse_id: 1, phones: ['0224849300', '0224849301'] },
      { supplier_id: 2, email: 'contact@eva.pharma', company_name: 'إيفا فارما للأدوية والمستلزمات', governorate: 'الجيزة', city: 'الهرم', street: 'شارع المنصورية الرئيسي', warehouse_id: 4, phones: ['0233857200', '0233857201'] },
      { supplier_id: 3, email: 'sales@amoun.com', company_name: 'شركة أمون للأدوية والصناعات', governorate: 'القاهرة', city: 'مدينة نصر', street: 'المنطقة الحرة الأولى', warehouse_id: 1, phones: ['0222634500', '0222634502'] },
      { supplier_id: 4, email: 'supply@pharco.org', company_name: 'مجموعة فاركو للأدوية الطبية', governorate: 'الإسكندرية', city: 'العامرية', street: 'المنطقة الصناعية الثالثة', warehouse_id: 3, phones: ['034700500', '034700501'] },
      { supplier_id: 5, email: 'info@sedico.com', company_name: 'سيديكو للصناعات الدوائية الطبية', governorate: 'الجيزة', city: '6 أكتوبر', street: 'المنطقة الصناعية الأولى بلوك 5', warehouse_id: 4, phones: ['0238330444'] },
      { supplier_id: 6, email: 'contact@eipico.com.eg', company_name: 'إيبيكو للأدوية المصرية الدولية', governorate: 'الشرقية', city: 'العاشر من رمضان', street: 'المنطقة الصناعية ب1', warehouse_id: 30, phones: ['015363322'] },
      { supplier_id: 7, email: 'orders@hikma.eg', company_name: 'شركة الحكمة مصر للأدوية', governorate: 'القاهرة', city: 'التجمع الخامس', street: 'شارع التسعين الشمالي', warehouse_id: 10, phones: ['0225372100'] },
      { supplier_id: 8, email: 'sales@novartis.eg', company_name: 'نوفارتس مصر للأدوية', governorate: 'القاهرة', city: 'المعادي', street: 'كورنيش النيل المعادي', warehouse_id: 1, phones: ['0225875000'] },
      { supplier_id: 9, email: 'info@glaxo.com.eg', company_name: 'جلاكسو سميثكلاين مصر', governorate: 'القاهرة', city: 'مدينة السلام', street: 'طريق بلبيس الصحراوي', warehouse_id: 7, phones: ['0226567100'] },
      { supplier_id: 10, email: 'contact@sanofi.eg', company_name: 'سانوفي مصر للمستحضرات الطبية', governorate: 'القليوبية', city: 'الزيدية', street: 'طريق القناطر الرئيسي', warehouse_id: 27, phones: ['0244621000'] }
    ];

    // 3. Medicines (from SQL)
    const medicines = [
      { medicine_id: 1, medicine_name: 'Panadol Advance 500mg', medicine_type: 'Analgesic', expiry_date: '2028-12-01', price: 35.00, supplier_id: 1, warehouse_id: 1, active_ingredient: 'Paracetamol' },
      { medicine_id: 2, medicine_name: 'Augmentin 1g Tablets', medicine_type: 'Antibiotic', expiry_date: '2027-06-15', price: 120.00, supplier_id: 9, warehouse_id: 7, active_ingredient: 'Amoxicillin + Clavulanic' },
      { medicine_id: 3, medicine_name: 'Cataflam 50mg', medicine_type: 'Anti-inflammatory', expiry_date: '2028-03-20', price: 55.00, supplier_id: 8, warehouse_id: 1, active_ingredient: 'Diclofenac Potassium' },
      { medicine_id: 4, medicine_name: 'Concor 5mg Plus', medicine_type: 'Antihypertensive', expiry_date: '2029-01-10', price: 48.50, supplier_id: 2, warehouse_id: 4, active_ingredient: 'Bisoprolol' },
      { medicine_id: 5, medicine_name: 'Antinal Capsules', medicine_type: 'Antidiarrheal', expiry_date: '2027-11-30', price: 32.00, supplier_id: 2, warehouse_id: 4, active_ingredient: 'Nifuroxazide' },
      { medicine_id: 6, medicine_name: 'Amoxicillin 500mg', medicine_type: 'Antibiotic', expiry_date: '2027-09-14', price: 28.00, supplier_id: 6, warehouse_id: 30, active_ingredient: 'Amoxicillin' },
      { medicine_id: 7, medicine_name: 'Brufen 400mg', medicine_type: 'Analgesic', expiry_date: '2028-08-25', price: 42.00, supplier_id: 4, warehouse_id: 3, active_ingredient: 'Ibuprofen' },
      { medicine_id: 8, medicine_name: 'Lipitor 20mg', medicine_type: 'Cholesterol', expiry_date: '2029-05-12', price: 210.00, supplier_id: 1, warehouse_id: 1, active_ingredient: 'Atorvastatin' },
      { medicine_id: 9, medicine_name: 'Glucophage 1000mg', medicine_type: 'Antidiabetic', expiry_date: '2028-10-05', price: 60.00, supplier_id: 8, warehouse_id: 1, active_ingredient: 'Metformin' },
      { medicine_id: 10, medicine_name: 'Zyrtec 10mg Tablets', medicine_type: 'Antihistamine', expiry_date: '2028-04-18', price: 45.00, supplier_id: 7, warehouse_id: 10, active_ingredient: 'Cetirizine' }
    ];

    // 4. Branches (from SQL)
    const branches = [
      { branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي', branch_status: 'نشط', phone: '0224012345', governorate: 'القاهرة', city: 'مدينة نصر', street: 'شارع الطيران', warehouse_id: 1, employee_id: 1, manager_name: 'محمود رأفت علي', manager_start_date: '2015-01-15' },
      { branch_id: 2, branch_name: 'فرع العزبي - الدقي التحرير', branch_status: 'نشط', phone: '0233356789', governorate: 'الجيزة', city: 'الدقي', street: 'شارع التحرير', warehouse_id: 4, employee_id: 9, manager_name: 'نهى شفيق زاهر', manager_start_date: '2021-10-05' },
      { branch_id: 3, branch_name: 'فرع العزبي - سموحة فوزي معاذ', branch_status: 'نشط', phone: '034201122', governorate: 'الإسكندرية', city: 'سموحة', street: 'شارع فوزي معاذ', warehouse_id: 3, employee_id: 19, manager_name: 'عمرو وجدي الحكيم', manager_start_date: '2023-09-01' },
      { branch_id: 4, branch_name: 'فرع العزبي - طنطا الجيش', branch_status: 'نشط', phone: '0403314455', governorate: 'الغربية', city: 'طنطا', street: 'شارع الجيش', warehouse_id: 2, employee_id: 28, manager_name: 'وائل بهجت النمس', manager_start_date: '2024-09-11' },
      { branch_id: 7, branch_name: 'فرع العزبي - العبور الصناعية', branch_status: 'تحت التجديد', phone: '0244891122', governorate: 'القليوبية', city: 'العبور', street: 'المنطقة الصناعية الأولى', warehouse_id: 7, employee_id: 2, manager_name: 'محمد أحمد حسن', manager_start_date: '2016-03-20' }
    ];

    // 5. Employees (from SQL)
    const employees = [
      { employee_id: 1, employee_name: 'محمود رأفت علي', national_id: '29501010101234', hire_date: '2015-01-15', phone: '01011112222', job_title: 'مدير فرع', salary: 15000.00, branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي' },
      { employee_id: 2, employee_name: 'محمد أحمد حسن', national_id: '29602020202345', hire_date: '2016-03-20', phone: '01122223333', job_title: 'صيدلي أول', salary: 12000.00, branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي' },
      { employee_id: 3, employee_name: 'عبد الرحمن محمد', national_id: '29703030303456', hire_date: '2017-06-10', phone: '01233334444', job_title: 'صيدلي ثان', salary: 9500.00, branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي' },
      { employee_id: 4, employee_name: 'مصطفى كمال السيد', national_id: '29804040404567', hire_date: '2018-09-01', phone: '01544445555', job_title: 'مساعد صيدلي', salary: 7000.00, branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي' },
      { employee_id: 5, employee_name: 'أحمد شريف بدوي', national_id: '29905050505678', hire_date: '2019-11-15', phone: '01055556666', job_title: 'كاشير رئيسي', salary: 6500.00, branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي' },
      { employee_id: 7, employee_name: 'خالد عثمان الجيار', national_id: '29307070707890', hire_date: '2020-05-25', phone: '01277778888', job_title: 'طيار دليفري', salary: 5500.00, branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي' }
    ];

    // 6. Customers (from SQL)
    const customers = [
      { customer_id: 1, customer_name: 'أحمد محمد علي زكي', phone: '01012345678', loyalty_points: 150, governorate: 'القاهرة', city: 'مدينة نصر', street: 'شارع عباس العقاد رئيسي' },
      { customer_id: 2, customer_name: 'سارة مصطفى حسن عبد الله', phone: '01122334455', loyalty_points: 320, governorate: 'الجيزة', city: 'الدقي', street: 'شارع مصدق أمام البريد' },
      { customer_id: 3, customer_name: 'محمد عبد الرحمن محمود شاكر', phone: '01233445566', loyalty_points: 75, governorate: 'الإسكندرية', city: 'سموحة', street: 'شارع ألبرت الأول برج السلام' },
      { customer_id: 4, customer_name: 'فاطمة إبراهيم خليل السيد', phone: '01555667788', loyalty_points: 20, governorate: 'الغربية', city: 'طنطا', street: 'شارع سعيد بجوار الكنيسة' },
      { customer_id: 5, customer_name: 'عمر شريف بدوي الرشيدي', phone: '01099887766', loyalty_points: 450, governorate: 'القاهرة', city: 'مصر الجديدة', street: 'شارع الميرغني خلف الاستاد' }
    ];

    // 7. Branch Inventory (from SQL)
    const inventory = [
      { inventory_id: 1, branch_id: 1, medicine_id: 1, medicine_name: 'Panadol Advance 500mg', available_quantity: 150, reorder_level: 20, shelf_location: 'الرف أ-١', expiry_date_batch: '2028-12-01', price: 35.00 },
      { inventory_id: 2, branch_id: 1, medicine_id: 2, medicine_name: 'Augmentin 1g Tablets', available_quantity: 12, reorder_level: 15, shelf_location: 'الرف ب-٣', expiry_date_batch: '2027-06-15', price: 120.00 }, // Low stock!
      { inventory_id: 3, branch_id: 1, medicine_id: 3, medicine_name: 'Cataflam 50mg', available_quantity: 120, reorder_level: 25, shelf_location: 'الرف أ-٢', expiry_date_batch: '2028-03-20', price: 55.00 },
      { inventory_id: 4, branch_id: 1, medicine_id: 4, medicine_name: 'Concor 5mg Plus', available_quantity: 8, reorder_level: 10, shelf_location: 'الرف ج-١', expiry_date_batch: '2029-01-10', price: 48.50 }, // Low stock!
      { inventory_id: 5, branch_id: 1, medicine_id: 5, medicine_name: 'Antinal Capsules', available_quantity: 200, reorder_level: 30, shelf_location: 'الرف د-٢', expiry_date_batch: '2026-12-15', price: 32.00 }, // Near expiry!
      { inventory_id: 6, branch_id: 1, medicine_id: 6, medicine_name: 'Amoxicillin 500mg', available_quantity: 65, reorder_level: 15, shelf_location: 'الرف ب-١', expiry_date_batch: '2027-09-14', price: 28.00 },
      { inventory_id: 7, branch_id: 1, medicine_id: 7, medicine_name: 'Brufen 400mg', available_quantity: 5, reorder_level: 20, shelf_location: 'الرف أ-٤', expiry_date_batch: '2028-08-25', price: 42.00 }, // Critical Low stock!
      { inventory_id: 8, branch_id: 1, medicine_id: 8, medicine_name: 'Lipitor 20mg', available_quantity: 45, reorder_level: 10, shelf_location: 'الرف ج-٥', expiry_date_batch: '2026-05-10', price: 210.00 } // Expired!
    ];

    // 8. Invoices (from SQL)
    const invoices = [
      { invoice_id: 1, invoice_date: '2026-11-25 09:15:00', total_amount: 150.00, payment_method: 'نقدي', employee_id: 1, employee_name: 'محمود رأفت علي', branch_id: 1, customer_id: 1, customer_name: 'أحمد محمد علي زكي', items_count: 2 },
      { invoice_id: 2, invoice_date: '2026-11-25 10:30:12', total_amount: 240.00, payment_method: 'فيزا', employee_id: 2, employee_name: 'محمد أحمد حسن', branch_id: 1, customer_id: 2, customer_name: 'سارة مصطفى حسن عبد الله', items_count: 1 },
      { invoice_id: 3, invoice_date: '2026-11-25 11:45:30', total_amount: 55.00, payment_method: 'نقدي', employee_id: 1, employee_name: 'محمود رأفت علي', branch_id: 1, customer_id: 3, customer_name: 'محمد عبد الرحمن محمود شاكر', items_count: 1 }
    ];

    // 9. Delivery Orders (from SQL)
    const deliveries = [
      { delivery_id: 1, invoice_id: 1, driver_name: 'كابتن خالد عثمان', delivery_status: 'تم التوصيل', departure_time: '2026-11-25 09:30:00', delivery_fees: 15.00, customer_signature: 'أحمد محمد', customer_name: 'أحمد محمد علي زكي' },
      { delivery_id: 2, invoice_id: 2, driver_name: 'كابتن خالد عثمان', delivery_status: 'في الطريق', departure_time: '2026-11-25 10:45:00', delivery_fees: 20.00, customer_signature: '', customer_name: 'سارة مصطفى حسن عبد الله' },
      { delivery_id: 3, invoice_id: 3, driver_name: 'كابتن يوسف أمجد', delivery_status: 'في الانتظار', departure_time: '2026-11-25 12:00:00', delivery_fees: 15.00, customer_signature: '', customer_name: 'محمد عبد الرحمن محمود شاكر' }
    ];

    localStorage.setItem('ezaby_warehouses', JSON.stringify(warehouses));
    localStorage.setItem('ezaby_suppliers', JSON.stringify(suppliers));
    localStorage.setItem('ezaby_medicines', JSON.stringify(medicines));
    localStorage.setItem('ezaby_branches', JSON.stringify(branches));
    localStorage.setItem('ezaby_employees', JSON.stringify(employees));
    localStorage.setItem('ezaby_customers', JSON.stringify(customers));
    localStorage.setItem('ezaby_inventory', JSON.stringify(inventory));
    localStorage.setItem('ezaby_invoices', JSON.stringify(invoices));
    localStorage.setItem('ezaby_deliveries', JSON.stringify(deliveries));
    localStorage.setItem('ezaby_db_seeded', 'true');
  },

  get(table) {
    this.initData();
    return JSON.parse(localStorage.getItem(`ezaby_${table}`) || '[]');
  },

  set(table, data) {
    localStorage.setItem(`ezaby_${table}`, JSON.stringify(data));
  }
};

// Main API interface (Used directly across all 12 pages)
const API = {
  // 1. Dashboard Statistics
  async getDashboardStats(branchId = 1) {
    const invoices = DB.get('invoices');
    const customers = DB.get('customers');
    const medicines = DB.get('medicines');
    const inventory = DB.get('inventory').filter(item => !branchId || item.branch_id === Number(branchId));
    const branches = DB.get('branches');

    const todaySales = invoices.reduce((sum, inv) => sum + Number(inv.total_amount), 0);
    const lowStock = inventory.filter(item => item.available_quantity <= item.reorder_level);
    
    const now = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(now.getMonth() + 3);

    const expired = inventory.filter(item => new Date(item.expiry_date_batch) < now);
    const nearExpiry = inventory.filter(item => {
      const exp = new Date(item.expiry_date_batch);
      return exp >= now && exp <= threeMonthsLater;
    });

    return {
      today_sales: todaySales.toFixed(2),
      today_invoices_count: invoices.length,
      total_customers: customers.length,
      total_medicines: medicines.length,
      low_stock_count: lowStock.length,
      near_expiry_count: nearExpiry.length,
      expired_count: expired.length,
      total_branches: branches.length,
      low_stock_items: lowStock.slice(0, 5),
      near_expiry_items: nearExpiry.slice(0, 5),
      recent_invoices: invoices.slice(-5).reverse()
    };
  },

  // 2. Suppliers
  async getSuppliers(search = '') {
    let list = DB.get('suppliers');
    const warehouses = DB.get('warehouses');
    list = list.map(s => {
      const w = warehouses.find(wh => wh.warehouse_id === s.warehouse_id);
      return { ...s, warehouse_name: w ? w.warehouse_name : 'غير محدد' };
    });
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.company_name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
    }
    return list;
  },

  async addSupplier(data) {
    const list = DB.get('suppliers');
    const newId = list.length ? Math.max(...list.map(s => s.supplier_id)) + 1 : 1;
    const newSupplier = { ...data, supplier_id: newId };
    list.unshift(newSupplier);
    DB.set('suppliers', list);
    return newSupplier;
  },

  async updateSupplier(id, data) {
    let list = DB.get('suppliers');
    list = list.map(s => s.supplier_id === Number(id) ? { ...s, ...data } : s);
    DB.set('suppliers', list);
    return { success: true };
  },

  async deleteSupplier(id) {
    let list = DB.get('suppliers');
    list = list.filter(s => s.supplier_id !== Number(id));
    DB.set('suppliers', list);
    return { success: true };
  },

  // 3. Central Warehouse
  async getWarehouses() {
    const warehouses = DB.get('warehouses');
    const medicines = DB.get('medicines');
    const suppliers = DB.get('suppliers');
    return warehouses.map(w => ({
      ...w,
      medicines_count: medicines.filter(m => m.warehouse_id === w.warehouse_id).length,
      suppliers_count: suppliers.filter(s => s.warehouse_id === w.warehouse_id).length
    }));
  },

  // 4. Medicines
  async getMedicines(search = '', type = '') {
    let list = DB.get('medicines');
    const suppliers = DB.get('suppliers');
    const warehouses = DB.get('warehouses');

    list = list.map(m => ({
      ...m,
      supplier_name: (suppliers.find(s => s.supplier_id === m.supplier_id) || {}).company_name || 'غير محدد',
      warehouse_name: (warehouses.find(w => w.warehouse_id === m.warehouse_id) || {}).warehouse_name || 'غير محدد'
    }));

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(m => m.medicine_name.toLowerCase().includes(q) || (m.active_ingredient && m.active_ingredient.toLowerCase().includes(q)));
    }
    if (type) {
      list = list.filter(m => m.medicine_type === type);
    }
    return list;
  },

  async addMedicine(data) {
    const list = DB.get('medicines');
    const newId = list.length ? Math.max(...list.map(m => m.medicine_id)) + 1 : 1;
    const item = { ...data, medicine_id: newId };
    list.unshift(item);
    DB.set('medicines', list);
    return item;
  },

  async updateMedicine(id, data) {
    let list = DB.get('medicines');
    list = list.map(m => m.medicine_id === Number(id) ? { ...m, ...data } : m);
    DB.set('medicines', list);
    return { success: true };
  },

  async deleteMedicine(id) {
    let list = DB.get('medicines');
    list = list.filter(m => m.medicine_id !== Number(id));
    DB.set('medicines', list);
    return { success: true };
  },

  // 5. Branches
  async getBranches() {
    return DB.get('branches');
  },

  async addBranch(data) {
    const list = DB.get('branches');
    const newId = list.length ? Math.max(...list.map(b => b.branch_id)) + 1 : 1;
    const item = { ...data, branch_id: newId };
    list.push(item);
    DB.set('branches', list);
    return item;
  },

  async updateBranch(id, data) {
    let list = DB.get('branches');
    list = list.map(b => b.branch_id === Number(id) ? { ...b, ...data } : b);
    DB.set('branches', list);
    return { success: true };
  },

  async deleteBranch(id) {
    let list = DB.get('branches');
    list = list.filter(b => b.branch_id !== Number(id));
    DB.set('branches', list);
    return { success: true };
  },

  // 6. Employees
  async getEmployees(search = '', branchId = '') {
    let list = DB.get('employees');
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(e => e.employee_name.toLowerCase().includes(q) || e.national_id.includes(q));
    }
    if (branchId) {
      list = list.filter(e => e.branch_id === Number(branchId));
    }
    return list;
  },

  async addEmployee(data) {
    const list = DB.get('employees');
    // Validate National ID unique constraint
    if (list.some(e => e.national_id === data.national_id)) {
      throw new Error('الرقم القومي مسجل بالفعل لموظف آخر!');
    }
    const newId = list.length ? Math.max(...list.map(e => e.employee_id)) + 1 : 1;
    const item = { ...data, employee_id: newId };
    list.unshift(item);
    DB.set('employees', list);
    return item;
  },

  async updateEmployee(id, data) {
    let list = DB.get('employees');
    list = list.map(e => e.employee_id === Number(id) ? { ...e, ...data } : e);
    DB.set('employees', list);
    return { success: true };
  },

  async deleteEmployee(id) {
    let list = DB.get('employees');
    list = list.filter(e => e.employee_id !== Number(id));
    DB.set('employees', list);
    return { success: true };
  },

  // 7. Customers
  async getCustomers(search = '') {
    let list = DB.get('customers');
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => c.customer_name.toLowerCase().includes(q) || c.phone.includes(q));
    }
    return list;
  },

  async addCustomer(data) {
    const list = DB.get('customers');
    const newId = list.length ? Math.max(...list.map(c => c.customer_id)) + 1 : 1;
    const item = { ...data, customer_id: newId, loyalty_points: 0 };
    list.unshift(item);
    DB.set('customers', list);
    return item;
  },

  async updateCustomer(id, data) {
    let list = DB.get('customers');
    list = list.map(c => c.customer_id === Number(id) ? { ...c, ...data } : c);
    DB.set('customers', list);
    return { success: true };
  },

  async deleteCustomer(id) {
    let list = DB.get('customers');
    list = list.filter(c => c.customer_id !== Number(id));
    DB.set('customers', list);
    return { success: true };
  },

  // 8. Branch Inventory
  async getInventory(branchId = 1, status = 'all', search = '') {
    let list = DB.get('inventory').filter(item => item.branch_id === Number(branchId));
    const now = new Date();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(item => item.medicine_name.toLowerCase().includes(q) || item.shelf_location.toLowerCase().includes(q));
    }

    if (status === 'low_stock') {
      list = list.filter(item => item.available_quantity <= item.reorder_level);
    } else if (status === 'expired') {
      list = list.filter(item => new Date(item.expiry_date_batch) < now);
    } else if (status === 'near_expiry') {
      const future = new Date();
      future.setMonth(now.getMonth() + 3);
      list = list.filter(item => {
        const d = new Date(item.expiry_date_batch);
        return d >= now && d <= future;
      });
    }

    return list;
  },

  // 9. Point of Sale (POS) - Transactional Invoice Creation
  async createInvoice(invoiceData) {
    const inventory = DB.get('inventory');
    const customers = DB.get('customers');
    const invoices = DB.get('invoices');
    const deliveries = DB.get('deliveries');

    // 1. Transaction Step 1: Validate stock for all items
    for (const item of invoiceData.items) {
      const invRow = inventory.find(i => i.branch_id === Number(invoiceData.branch_id) && i.medicine_id === Number(item.medicine_id));
      if (!invRow) {
        throw new Error(`الدواء (${item.medicine_name}) غير موجود بمخزون هذا الفرع!`);
      }
      if (invRow.available_quantity < Number(item.sold_quantity)) {
        throw new Error(`الكمية المتاحة من (${item.medicine_name}) هي (${invRow.available_quantity}) فقط، لا يمكن بيع (${item.sold_quantity})!`);
      }
    }

    // 2. Transaction Step 2: Deduct quantities
    for (const item of invoiceData.items) {
      const invRow = inventory.find(i => i.branch_id === Number(invoiceData.branch_id) && i.medicine_id === Number(item.medicine_id));
      invRow.available_quantity -= Number(item.sold_quantity);
    }
    DB.set('inventory', inventory);

    // 3. Transaction Step 3: Insert Invoice
    const newInvoiceId = invoices.length ? Math.max(...invoices.map(i => i.invoice_id)) + 1 : 1;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newInvoice = {
      invoice_id: newInvoiceId,
      invoice_date: nowStr,
      total_amount: Number(invoiceData.total_amount),
      payment_method: invoiceData.payment_method,
      employee_id: invoiceData.employee_id,
      employee_name: invoiceData.employee_name,
      branch_id: invoiceData.branch_id,
      customer_id: invoiceData.customer_id,
      customer_name: invoiceData.customer_name,
      items_count: invoiceData.items.length,
      items: invoiceData.items
    };
    invoices.push(newInvoice);
    DB.set('invoices', invoices);

    // 4. Transaction Step 4: Update Customer Loyalty Points (+1 point per 10 EGP)
    const pointsGained = Math.floor(Number(invoiceData.total_amount) / 10);
    const customer = customers.find(c => c.customer_id === Number(invoiceData.customer_id));
    if (customer) {
      customer.loyalty_points = (customer.loyalty_points || 0) + pointsGained;
      DB.set('customers', customers);
    }

    // 5. Transaction Step 5: If Home Delivery, create Delivery Order
    if (invoiceData.delivery && invoiceData.delivery.is_delivery) {
      const newDelId = deliveries.length ? Math.max(...deliveries.map(d => d.delivery_id)) + 1 : 1;
      const deliveryOrder = {
        delivery_id: newDelId,
        invoice_id: newInvoiceId,
        driver_name: invoiceData.delivery.driver_name || 'طيار الفرع',
        delivery_status: 'في الانتظار',
        departure_time: nowStr,
        delivery_fees: Number(invoiceData.delivery.delivery_fees || 0),
        customer_signature: invoiceData.delivery.customer_signature || '',
        customer_name: invoiceData.customer_name
      };
      deliveries.unshift(deliveryOrder);
      DB.set('deliveries', deliveries);
    }

    return { success: true, invoice_id: newInvoiceId, loyalty_points_earned: pointsGained };
  },

  // 10. Deliveries
  async getDeliveries(status = 'all', search = '') {
    let list = DB.get('deliveries');
    if (status !== 'all') {
      list = list.filter(d => d.delivery_status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(d => d.customer_name.toLowerCase().includes(q) || d.driver_name.toLowerCase().includes(q) || String(d.invoice_id) === q);
    }
    return list;
  },

  async updateDeliveryStatus(id, newStatus) {
    let list = DB.get('deliveries');
    list = list.map(d => d.delivery_id === Number(id) ? { ...d, delivery_status: newStatus } : d);
    DB.set('deliveries', list);
    return { success: true };
  },

  // 11. Reports
  async getSalesReport() {
    const invoices = DB.get('invoices');
    return invoices;
  }
};
